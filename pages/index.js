import { NotionRenderer } from "react-notion";

export async function getStaticProps() {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/page/d10904da06fa44f7adee694e6032e76a"
  ).then(res => res.json());

  return {
    props: {
      blockMap: data
    }
  };
}

export default ({ blockMap }) => (
  <div>
    <NotionRenderer blockMap={blockMap} />
    <style jsx global>{`
        div :global(.notion-code) {
          box-sizing: border-box;
        }
        body {
          padding: 0;
          margin: 0;
        }
      `}</style>
  </div>
);
