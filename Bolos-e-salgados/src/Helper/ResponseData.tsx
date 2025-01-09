export function ResponseData(json, produtDataJson) {
  return {
    banner: {
      banner_title: json.data.attributes.banner_title,
      Banner_img: json.data.attributes.Banner_img.data.attributes.url || "",
    },
    kit: json.data.attributes.kit && {
      title: json.data.attributes.kit?.title,
      description: json.data.attributes.kit?.description,
      image: {
        name: json.data.attributes?.kit?.image.data.attributes.name,
        url: json.data.attributes?.kit?.image.data.attributes.url,
      },
    },
    featured: {
      featuredData: json.data.attributes.destaque,
      productData: produtDataJson,
    },

    error: false,
  };
}
