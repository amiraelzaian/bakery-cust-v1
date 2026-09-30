import AssistantChat from "@/components/assistant/AssistantChat";

export const metadata = {
  title: "GOLDEN CRUMBS | AI Assistant",
  description:
    "Chat with the Golden Crumbs assistant to find products, manage your cart and wishlist, and place orders.",
};

export default function AssistantPage() {
  return (
    <section className="mx-auto h-screen w-full overflow-hidden  pt-15">
      <AssistantChat />
    </section>
  );
}