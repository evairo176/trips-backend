import slugify from 'slugify';

export async function generateSlug(text: string) {
  return slugify(text, {
    lower: true, // Convert to lower case
    strict: true, // Strip special characters except for dashes
    remove: /[*+~.()'"!:@]/g, // Remove specific characters
  });
}
