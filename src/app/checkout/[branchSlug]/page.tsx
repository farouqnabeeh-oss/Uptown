import { redirect } from "next/navigation";
import { getBranchBySlug, getSiteSettings } from "@/lib/data";
import CheckoutFormWrapper from "@/components/checkout-form-wrapper";

type CheckoutPageProps = {
  params: Promise<{
    branchSlug: string;
  }>;
};

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { branchSlug } = await params;
  const [branch, settings] = await Promise.all([getBranchBySlug(branchSlug), getSiteSettings()]);

  if (!branch) {
    redirect("/");
  }

  return (
    <div className="ultra-checkout-shell" style={{ minHeight: '100vh', background: 'var(--luxury-cream)', paddingBottom: '100px' }}>
      <div className="checkout-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '120px 24px' }}>
        


        <CheckoutFormWrapper branch={branch} settings={settings as any} lang="ar" />

      </div>
    </div>
  );
}
