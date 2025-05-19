export const seo = ({
	title,
	description,
	keywords,
	image,
	twiiterCreator,
	twitterSite,
	twitterCard,
}: {
	title: string;
	description?: string;
	image?: string;
	keywords?: string;
	twiiterCreator?: string;
	twitterSite?: string;
	twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}) => {
	const tags = [
		{ title },
		{ name: 'description', content: description },
		{ name: 'keywords', content: keywords },
		{ name: 'twitter:title', content: title },
		{ name: 'twitter:description', content: description },
		{ name: 'twitter:creator', content: twiiterCreator },
		{ name: 'twitter:site', content: twitterSite },
		{ name: 'og:type', content: 'website' },
		{ name: 'og:title', content: title },
		{ name: 'og:description', content: description },
		...(image
			? [
					{ name: 'twitter:image', content: image },
					{ name: 'twitter:card', content: twitterCard },
					{ name: 'og:image', content: image },
				]
			: []),
	];

	return tags;
};
