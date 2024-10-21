export function articleDate(publishedDate: string | Date, updatedDate?: null | string | Date) {
  const humanPublished = humanReadable(publishedDate);

  if (updatedDate) {
    const humanUpdated = humanReadable(updatedDate);

    return humanPublished !== humanUpdated
      ? `${humanReadable(publishedDate)} — Updated at ${humanReadable(updatedDate)}`
      : humanReadable(publishedDate);
  }

  return humanPublished;
}

export function humanReadable(
  date: string | Date,
  options?: Parameters<typeof Intl.DateTimeFormat>[1],
) {
  const dateObject = new Date(date);

  return new Intl.DateTimeFormat(
    'en-GB',
    options ?? {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  ).format(dateObject);
}

// const publishedAt = props.content?.publishedAt ? useLocalisedDate(props.content.publishedAt) : undefined;
// const updatedAt = props.content?.updatedAt ? useLocalisedDate(props.content.updatedAt) : undefined;
//
// const postedAndUpdatedText = updatedAt && publishedAt !== updatedAt
//   ? t('blogPostedUpdated', { postedDate: publishedAt, updatedDate: updatedAt })
//   : t('blogPosted', { postedDate: publishedAt });
