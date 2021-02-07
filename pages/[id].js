import { withUrqlClient } from "next-urql";
import { useQuery } from "urql";
import Router from "next/router";

function AboutPage() {
  useQuery({ query: "query { todo }" });
  return <div>About us</div>;
}

export default withUrqlClient(
  function (ssr, ctx) {
    return {
      url: "hi",
      fetchOptions: () =>
        console.log(ctx ? ctx.query.id : Router.query.id) || {
          headers: {
            //"default-token" is getting sent
            token: ctx ? ctx.query.id : Router.query.id
          }
        }
    };
  },
  { ssr: false }
)(AboutPage);
