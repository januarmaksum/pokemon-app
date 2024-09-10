import { useRouter } from "next/router";
import Layout from "@/components/layout";

export default function Detail() {
  const router = useRouter();
  const title = String(router.query.slug || "");
  return <Layout title={title}>Detail {router.query.slug}</Layout>;
}
