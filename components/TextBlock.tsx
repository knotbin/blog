import { PubLeafletBlocksText } from "npm:@atcute/leaflet";

interface TextBlockProps {
  plaintext: string;
  facets?: PubLeafletBlocksText.Main["facets"];
}

interface LinkFeature {
  $type: "pub.leaflet.richtext.facet#link";
  uri: string;
}

function byteToCharIndex(text: string, byteIndex: number): number {
  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();
  const fullBytes = textEncoder.encode(text);
  const bytes = fullBytes.slice(0, byteIndex);
  return textDecoder.decode(bytes).length;
}

export function TextBlock({ plaintext, facets }: TextBlockProps) {
  // Only process facets if at least one facet has features
  if (!facets || !facets.some((f) => f.features && f.features.length > 0)) {
    return <>{plaintext}</>;
  }

  const parts: (string | { text: string; type: string; uri?: string })[] = [];
  let lastIndex = 0;

  facets.forEach((facet) => {
    // Convert byte positions to character positions
    const charStart = byteToCharIndex(plaintext, facet.index.byteStart);
    const charEnd = byteToCharIndex(plaintext, facet.index.byteEnd);
    const charLastIndex = byteToCharIndex(plaintext, lastIndex);

    if (charStart > charLastIndex) {
      parts.push(plaintext.slice(charLastIndex, charStart));
    }

    const text = plaintext.slice(charStart, charEnd);
    const feature = facet.features?.[0];

    if (!feature) {
      parts.push(text);
      return;
    }

    if (feature.$type === "pub.leaflet.richtext.facet#bold") {
      parts.push({ text, type: feature.$type });
    } else if (feature.$type === "pub.leaflet.richtext.facet#highlight") {
      parts.push({ text, type: feature.$type });
    } else if (feature.$type === "pub.leaflet.richtext.facet#italic") {
      parts.push({ text, type: feature.$type });
    } else if (feature.$type === "pub.leaflet.richtext.facet#strikethrough") {
      parts.push({ text, type: feature.$type });
    } else if (feature.$type === "pub.leaflet.richtext.facet#underline") {
      parts.push({ text, type: feature.$type });
    } else if (feature.$type === "pub.leaflet.richtext.facet#link") {
      const linkFeature = feature as LinkFeature;
      parts.push({ text, type: feature.$type, uri: linkFeature.uri });
    } else {
      parts.push(text);
    }

    lastIndex = facet.index.byteEnd;
  });

  // Convert final lastIndex from bytes to characters
  const charLastIndex = byteToCharIndex(plaintext, lastIndex);

  if (charLastIndex < plaintext.length) {
    parts.push(plaintext.slice(charLastIndex));
  }

  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === "string") {
          return part;
        }

        switch (part.type) {
          case "pub.leaflet.richtext.facet#bold":
            return <strong key={i}>{part.text}</strong>;
          case "pub.leaflet.richtext.facet#highlight":
            return (
              <mark
                key={i}
                className="bg-blue-100 dark:bg-blue-900 text-inherit rounded px-1"
                style={{ borderRadius: "0.375rem" }}
              >
                {part.text}
              </mark>
            );
          case "pub.leaflet.richtext.facet#italic":
            return <em key={i}>{part.text}</em>;
          case "pub.leaflet.richtext.facet#strikethrough":
            return <s key={i}>{part.text}</s>;
          case "pub.leaflet.richtext.facet#underline":
            return <u key={i}>{part.text}</u>;
          case "pub.leaflet.richtext.facet#link":
            return (
              <a
                key={i}
                href={part.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {part.text}
              </a>
            );
          default:
            return part.text;
        }
      })}
    </>
  );
}
