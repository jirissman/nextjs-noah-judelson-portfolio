import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EmptyContent } from "@/components/MissingPage";
import imageUrlBuilder from "@sanity/image-url";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { CATEGORY_QUERY } from "@/sanity/lib/queries";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function HomePage() {
  const { data: categories } = await sanityFetch({ query: CATEGORY_QUERY });

  // Handle case where no categories exist
  if (!categories || categories.length === 0) {
    return (
      <EmptyContent
        contentType="Photo Categories"
        createHref="/studio/structure/category"
      />
    );
  }

  const backupPhotos = [
    {
      image: "/static-images/_DSC4845.JPG.jpeg",
      alt: "A person standing in a ravine of red rock",
    },
    {
      image: "/static-images/_DSC4716.JPG.jpeg",
      alt: "A car on a cliff overlooking a canyon",
    },
    {
      image: "/static-images/_DSC5605.JPEG",
      alt: "Woman standing on a cliff overlooking a lake high up in the mountains",
    },
  ];

  return (
    <div className="scroll-container">
      <Header />
      {/* Horizontal category panels */}
      <main className="flex h-screen pt-0">
        {categories.map((category, index) => (
          <Link
            key={`${category._id}`}
            href={`/${category?.slug?.current}`}
            className="group block flex-1"
          >
            <section
              className="relative flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(
                ${
                  category?.coverPhoto
                    ? urlFor(category.coverPhoto)?.url() || ""
                    : backupPhotos[index % backupPhotos.length].image
                }
                )`,
              }}
            >
              {/* Category content overlay */}
              <div className="z-10 transform px-4 text-center text-white transition-all duration-500 group-hover:scale-110">
                <h2 className="mb-4 text-2xl font-bold tracking-wide sm:text-4xl md:text-6xl">
                  {category.title}
                </h2>
                <p className="mx-auto max-w-lg text-sm font-light opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:text-lg md:text-xl">
                  {category.description}
                </p>
              </div>

              {/* Gradient overlay for better text readability */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
            </section>
          </Link>
        ))}
      </main>

      {/* Footer appears below the panels */}
      <Footer />
    </div>
  );
}
