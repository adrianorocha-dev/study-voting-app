import Poll from '../interfaces/Poll';

export type SortType = 'newest' | 'views' | 'votes';

export default function sortByOption(
  array: Poll[],
  option: SortType,
  ascending: boolean = false
) {
  if (option === 'newest') {
    return array.sort((a, b) => {
      const aMilis = Date.parse(a.creationDate);
      const bMilis = Date.parse(b.creationDate);

      return ascending ? aMilis - bMilis : bMilis - aMilis;
    });
  } else if (option === 'views') {
    return array.sort((a, b) =>
      ascending ? a.views - b.views : b.views - a.views
    );
  } else if (option === 'votes') {
    return array.sort((a, b) =>
      ascending
        ? (a.votes ?? 0) - (b.votes ?? 0)
        : (b.votes ?? 0) - (a.votes ?? 0)
    );
  }
}
