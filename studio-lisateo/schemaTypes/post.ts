import {defineField, defineType} from 'sanity'

/**
 * Journal / blog post — mirrors the shape the site used to import from
 * src/data/site.js (`blog[]`). The site now fetches these documents instead.
 *
 * Display date on the site is formatted as "MMM YYYY" from `publishedAt`,
 * matching the original look (e.g. "Oct 2021"); `publishedAt` also drives
 * ordering so newest posts come first.
 */
export const post = defineType({
  name: 'post',
  title: 'Journal post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL for this post (auto-filled from the title).',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date published',
      type: 'datetime',
      description: 'Shown on the site as month and year (e.g. "Oct 2021"). Also sorts the journal, newest first.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'A short category label shown on the card.',
      options: {
        list: [
          {title: 'The work', value: 'The work'},
          {title: 'Art therapy', value: 'Art therapy'},
          {title: 'Studio', value: 'Studio'},
          {title: 'Feature', value: 'Feature'},
          {title: 'Exhibitions', value: 'Exhibitions'},
        ],
      },
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string'}),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A one or two sentence summary shown on the journal index card.',
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'The full post. Each paragraph becomes a block of text.',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h2'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{name: 'href', type: 'url', title: 'URL'}],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery (optional)',
      type: 'array',
      description: 'Extra images woven between the paragraphs of the post.',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
        },
      ],
    }),
    defineField({
      name: 'source',
      title: 'Original source URL (optional)',
      type: 'url',
      description: 'Link to the original post, if it was published elsewhere first.',
    }),
  ],
  orderings: [
    {
      title: 'Date published, newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'tag', media: 'cover'},
  },
})
