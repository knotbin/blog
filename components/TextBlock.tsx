import { h } from "preact";
import { PubLeafletBlocksText } from "npm:@atcute/leaflet";

interface TextBlockProps {
  plaintext: string;
  facets?: PubLeafletBlocksText.Main["facets"];
}

export function TextBlock({ plaintext, facets }: TextBlockProps) {
  // Only process facets if at least one facet has features
  if (!facets || !facets.some(f => f.features && f.features.length > 0)) {
    return <>{plaintext}</>;
  }

  const parts: (string | { text: string; type: string; uri?: string })[] = [];
  let lastIndex = 0;

  facets.forEach((facet) => {
    if (facet.index.byteStart > lastIndex) {
      parts.push(plaintext.slice(lastIndex, facet.index.byteStart));
    }

    const text = plaintext.slice(facet.index.byteStart, facet.index.byteEnd);
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
    } else {
      parts.push({ text, type: feature.$type });
    }

    lastIndex = facet.index.byteEnd;
  });

  if (lastIndex < plaintext.length) {
    parts.push(plaintext.slice(lastIndex));
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
                style={{ borderRadius: '0.375rem' }}
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
          default:
            return part.text;
        }
      })}
    </>
  );
} 