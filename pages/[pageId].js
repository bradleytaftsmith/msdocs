import { NotionRenderer } from "react-notion";
import Head from "next/head";
import fetch from "node-fetch";

// export async function getStaticPaths() {
//   const data = await fetch(
//     'https://notion-api.splitbee.io/v1/table/021eaf5abd07437a96cea8a909439121'
//   ).then(res => res.json());
//
//   const paths = data.map((row) => {
//     const id = row.slug[0]
//     return `/${id}`
//   })
//
//   return { paths, fallback: true}
//
// }
//
// export async function getStaticProps({ params }) {
//   const pageId = params.pageId;
//
//   if (!pageId) {
//     return;
//   }
//
//   const data = await fetch(
//     `https://notion-api.splitbee.io/v1/page/${pageId}`
//   ).then(res => res.json());
//
//   return {
//     props: {
//       blockMap: data
//     }
//   };
// }

export async function getServerSideProps(context) {
  const pageId = context.params?.pageId;

  if (!pageId) {
    return;
  }

  const data = await fetch(
    `https://notion-api.splitbee.io/v1/page/${pageId}`
  ).then(res => res.json());

  return {
    props: {
      blockMap: data
    }
  };
}

const NotionPage = ({ blockMap }) => {
  if (!blockMap || Object.keys(blockMap).length === 0) {
    return (
      <div>
        ...Loading
      </div>
    );
  }

  const title =
    blockMap[Object.keys(blockMap)[0]]?.value.properties.title[0][0];

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <NotionRenderer blockMap={blockMap} fullPage />
      <style jsx global>{`
        div :global(.notion-code) {
          box-sizing: border-box;
        }
        body {
          padding: 0;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default NotionPage;
