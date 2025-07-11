import { defineType, defineField } from "sanity";

export const photoType = defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "A title or caption for the photo.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility.",
          validation: (Rule) =>
            Rule.custom((value, context) => {
              // Only require alt text if an image is uploaded
              const parent = context.parent as { asset?: { _ref: string } };
              if (parent?.asset?._ref && !value) {
                return "Alt text is required when an image is uploaded";
              }
              return true;
            }),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "The category this photo belongs to.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
      media: "image",
    },
    prepare(selection) {
      const { title, category, media } = selection;
      return {
        title: title,
        subtitle: `in ${category || "Uncategorized"}`,
        media: media,
      };
    },
  },
});
