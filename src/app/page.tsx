import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-6xl font-bold">
              The modern way to track your job applications
            </h1>
            <p className="text-muted-foreground mb-10 text-xl">
              Simplify your job hunt today.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/sign-in">
                <Button size="lg" className="h-12 px-8 text-lg font-medium">
                  Start for free <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">Free, forever.</p>
            </div>
          </div>
        </section>

        {/* Images */}
        <section className="border-t py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              {/* Tabs */}
              <Tabs defaultValue="img-1">
                <TabsList variant="line">
                  <TabsTrigger value="img-1">
                    Track your applications
                  </TabsTrigger>
                  <TabsTrigger value="img-2">Add Jobs</TabsTrigger>
                  <TabsTrigger value="img-3">Edit Jobs</TabsTrigger>
                </TabsList>
                <TabsContent value="img-1">
                  <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border shadow-xl shadow-muted/25">
                    <Image
                      src="/hero-images/hero1.png"
                      alt="dashboard"
                      width={1200}
                      height={800}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="img-2">
                  <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border shadow-xl shadow-muted/25">
                    <Image
                      src="/hero-images/hero2.png"
                      alt="dashboard"
                      width={1200}
                      height={800}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="img-3">
                  <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border shadow-xl shadow-muted/25">
                    <Image
                      src="/hero-images/hero3.png"
                      alt="dashboard"
                      width={1200}
                      height={800}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
