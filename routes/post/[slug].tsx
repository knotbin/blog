import { Handlers, PageProps } from "$fresh/server.ts";
import { Layout } from "../../islands/layout.tsx";
import { PostInfo } from "../../components/post-info.tsx";
import { Title } from "../../components/typography.tsx";
import { getPost } from "../../lib/api.ts";
import { Head } from "$fresh/runtime.ts";
import { TextBlock } from "../../components/TextBlock.tsx";
import {
  PubLeafletBlocksHeader,
  PubLeafletBlocksImage,
  PubLeafletBlocksText,
  PubLeafletBlocksUnorderedList,
  PubLeafletPagesLinearDocument,
} from "npm:@atcute/leaflet";
import { h } from "preact";

interface Post {
  uri: string;
  value: {
    title?: string;
    description?: string;
    pages?: PubLeafletPagesLinearDocument.Main[];
    publishedAt?: string;
  };
}

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    try {
      const { slug } = ctx.params;
      const post = await getPost(slug);
      return ctx.render(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      return new Response("Post not found", { status: 404 });
    }
  },
};

function Block({
  block,
  did,
  isList,
}: {
  block: PubLeafletPagesLinearDocument.Block;
  did: string;
  isList?: boolean;
}) {
  let b = block;

  let className = `
    postBlockWrapper
    pt-1
    ${
    isList
      ? "isListItem pb-0 "
      : "pb-2 last:pb-3 last:sm:pb-4 first:pt-2 sm:first:pt-3"
  }
    ${
    b.alignment === "lex:pub.leaflet.pages.linearDocument#textAlignRight"
      ? "text-right"
      : b.alignment === "lex:pub.leaflet.pages.linearDocument#textAlignCenter"
      ? "text-center"
      : ""
  }
    `;

  if (b.block.$type === "pub.leaflet.blocks.unorderedList") {
    return (
      <ul className="-ml-[1px] sm:ml-[9px] pb-2">
        {b.block.children.map((child, index) => (
          <ListItem item={child} did={did} key={index} className={className} />
        ))}
      </ul>
    );
  }

  if (b.block.$type === "pub.leaflet.blocks.image") {
    const imageBlock = b.block as PubLeafletBlocksImage.Main;
    const image = imageBlock.image as { ref: { $link: string } };
    const alt = imageBlock.alt || "";
    const aspect = imageBlock.aspectRatio;
    let width = aspect?.width;
    let height = aspect?.height;
    // Fallback to default size if not provided
    if (!width) width = 600;
    if (!height) height = 400;
    return (
      <img
        src={`/api/atproto_images?did=${did}&cid=${image.ref.$link}`}
        alt={alt}
        width={width}
        height={height}
        className={`!pt-3 sm:!pt-4 ${className}`}
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : undefined,
        }}
      />
    );
  }

  if (b.block.$type === "pub.leaflet.blocks.text") {
    return (
      <div className={` ${className}`}>
        <TextBlock facets={b.block.facets} plaintext={b.block.plaintext} />
      </div>
    );
  }

  if (b.block.$type === "pub.leaflet.blocks.header") {
    const header = b.block as PubLeafletBlocksHeader.Main;
    const level = header.level || 1;
    const Tag = `h${Math.min(level + 1, 6)}` as keyof h.JSX.IntrinsicElements;
    // Add heading styles based on level
    let headingStyle =
      "font-serif font-bold tracking-wide uppercase mt-8 break-words text-wrap ";
    switch (level) {
      case 1:
        headingStyle += "text-3xl lg:text-4xl";
        break;
      case 2:
        headingStyle += "text-3xl border-b pb-2 mb-6";
        break;
      case 3:
        headingStyle += "text-2xl";
        break;
      case 4:
        headingStyle += "text-xl";
        break;
      case 5:
        headingStyle += "text-lg";
        break;
      case 6:
        headingStyle += "text-base";
        break;
      default:
        headingStyle += "text-2xl";
    }
    return (
      <Tag className={headingStyle + " " + className}>
        <TextBlock plaintext={header.plaintext} facets={header.facets} />
      </Tag>
    );
  }

  return null;
}

function ListItem(props: {
  item: PubLeafletBlocksUnorderedList.Main["children"][number];
  did: string;
  className?: string;
}) {
  return (
    <li className={`!pb-0 flex flex-row gap-2`}>
      <div
        className={`listMarker shrink-0 mx-2 z-[1] mt-[14px] h-[5px] w-[5px] rounded-full bg-secondary`}
      />
      <div className="flex flex-col">
        <Block block={{ block: props.item.content }} did={props.did} isList />
        {props.item.children?.length
          ? (
            <ul className="-ml-[7px] sm:ml-[7px]">
              {props.item.children.map((child, index) => (
                <ListItem
                  item={child}
                  did={props.did}
                  key={index}
                  className={props.className}
                />
              ))}
            </ul>
          )
          : null}
      </div>
    </li>
  );
}

export default function BlogPage({ data: post }: PageProps<Post>) {
  if (!post) {
    return <div>Post not found</div>;
  }

  const firstPage = post.value.pages?.[0];
  let blocks: PubLeafletPagesLinearDocument.Block[] = [];
  if (firstPage?.$type === "pub.leaflet.pages.linearDocument") {
    blocks = firstPage.blocks || [];
  }
  // Deduplicate blocks by $type and plaintext
  const seen = new Set();
  const uniqueBlocks = blocks.filter((b) => {
    const key = b.block.$type + "|" + ((b.block as any).plaintext || "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const content = uniqueBlocks
    .filter((b) => b.block.$type === "pub.leaflet.blocks.text")
    .map((b) => (b.block as PubLeafletBlocksText.Main).plaintext)
    .join(" ");

  return (
    <>
      <Head>
        <title>{post.value.title} — knotbin</title>
        <meta
          name="description"
          content={post.value.description || "by Roscoe Rubin-Rottenberg"}
        />
      </Head>

      <Layout>
        <div class="p-8 pb-20 gap-16 sm:p-20">
          <link rel="alternate" href={post.uri} />
          <div class="max-w-[600px] mx-auto">
            <article class="w-full space-y-8">
              <div class="space-y-4 w-full">
                <Title>{post.value.title || "Untitled"}</Title>
                {post.value.description && (
                  <p class="text-xl italic md:text-2xl font-serif leading-relaxed max-w-prose">
                    {post.value.description}
                  </p>
                )}
                <PostInfo
                  content={content}
                  createdAt={post.value.publishedAt || new Date().toISOString()}
                  includeAuthor
                  className="text-sm"
                />
                <div class="diagonal-pattern w-full h-3" />
              </div>
              <div class="postContent flex flex-col">
                {uniqueBlocks.map((block, index) => (
                  <Block
                    block={block}
                    did={post.uri.split("/")[2]}
                    key={index}
                  />
                ))}
              </div>
            </article>
          </div>
        </div>
      </Layout>
    </>
  );
}
