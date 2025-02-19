import React, { HTMLAttributes, ReactElement, ReactHTML } from 'react';
import classNames from 'classnames';
import classed, { ClassedHTML } from '../lib/classed';
import styles from './utilities.module.css';
import ArrowIcon from './icons/Arrow';
import { PostBootData } from '../lib/boot';

export enum Theme {
  Avocado = 'avocado',
  Bacon = 'bacon',
  BlueCheese = 'blue-cheese',
  Bun = 'bun',
  Burger = 'burger',
  Cabbage = 'cabbage',
  Cheese = 'cheese',
  Ketchup = 'ketchup',
  Lettuce = 'lettuce',
}

export enum Justify {
  End = 'justify-end',
  Center = 'justify-center',
  Between = 'justify-between',
}

export interface ThemeColor {
  border: string;
  shadow: string;
  button: string;
}

const themeColors = {
  avocado: {
    border: 'border-theme-color-avocado',
    shadow: 'shadow-2-avocado',
    button: 'btn-primary-avocado',
  },
  burger: {
    border: 'border-theme-color-burger',
    shadow: 'shadow-2-burger',
    button: 'btn-primary-burger',
  },
  blueCheese: {
    border: 'border-theme-color-blueCheese',
    shadow: 'shadow-2-blueCheese',
    button: 'btn-primary-blueCheese',
  },
  lettuce: {
    border: 'border-theme-color-lettuce',
    shadow: 'shadow-2-lettuce',
    button: 'btn-primary-lettuce',
  },
  cheese: {
    border: 'border-theme-color-cheese',
    shadow: 'shadow-2-cheese',
    button: 'btn-primary-cheese',
  },
  bun: {
    border: 'border-theme-color-bun',
    shadow: 'shadow-2-bun',
    button: 'btn-primary-bun',
  },
  ketchup: {
    border: 'border-theme-color-ketchup',
    shadow: 'shadow-2-ketchup',
    button: 'btn-primary-ketchup',
  },
  bacon: {
    border: 'border-theme-color-bacon',
    shadow: 'shadow-2-bacon',
    button: 'btn-primary-bacon',
  },
  cabbage: {
    border: 'border-theme-color-cabbage',
    shadow: 'shadow-2-cabbage',
    button: 'btn-primary-cabbage',
  },
  onion: {
    border: 'border-theme-color-onion',
    shadow: 'shadow-2-onion',
    button: 'btn-primary-onion',
  },
  water: {
    border: 'border-theme-color-water',
    shadow: 'shadow-2-water',
    button: 'btn-primary-water',
  },
  primary: {
    border: 'border-primary',
    shadow: 'shadow-2',
    button: 'btn-primary',
  },
};

export const getThemeColor = (color: string, fallback: string): ThemeColor => {
  return themeColors[color] ?? themeColors[fallback];
};

export const upvoteCommentEventName = (upvoted: boolean): string =>
  upvoted ? 'upvote comment' : 'remove comment upvote';

export const postEventName = (
  update: Pick<PostBootData, 'upvoted' | 'bookmarked'>,
): string => {
  if ('upvoted' in update) {
    return !update.upvoted ? 'remove post upvote' : 'upvote post';
  }

  return !update.bookmarked ? 'remove post bookmark' : 'bookmark post';
};

export const pageBorders =
  'laptop:border-r laptop:border-l border-theme-divider-tertiary';

const pagePaddings = 'px-4 tablet:px-8';
const basePageClassNames = classNames(
  styles.pageContainer,
  'relative flex flex-col w-full z-1',
);

export const BasePageContainer = classed(
  'main',
  pagePaddings,
  basePageClassNames,
);

export const pageContainerClassNames = classNames(
  basePageClassNames,
  'items-stretch tablet:self-center laptop:min-h-page',
);

export const PageContainerCentered = classed(
  BasePageContainer,
  'min-h-page justify-center items-center',
);

export const PageContainer = classed(
  BasePageContainer,
  pagePaddings,
  pageContainerClassNames,
);

export const PageWidgets = classed(
  'aside',
  'flex flex-col gap-6 px-6 w-full max-w-full',
  'tablet:w-[18.75rem] tablet:max-w-[18.75rem]',
  'laptop:w-[21.25rem] laptop:max-w-[21.25rem]',
);

export const NewCommentContainer = classed(
  'div',
  'flex flex-col items-stretch w-full bg-theme-bg-primary',
);

export const ResponsivePageContainer = classed(
  PageContainer,
  pageBorders,
  'py-6 laptop:min-h-screen',
);

export const BaseFeedPage = classed(
  'main',
  'flex flex-col flex-1 items-start max-w-full pb-16',
  styles.feedPage,
);

export const FeedPage = classed(
  BaseFeedPage,
  'pt-10 px-6 laptop:px-16',
  styles.feedPage,
);

export const FormErrorMessage = classed(
  'div',
  'mt-4 text-theme-status-error typo-caption1',
);

export const ProfileHeading = classed('h1', 'm-0 self-start typo-title2');

export const ActiveTabIndicator = classed(
  'div',
  'absolute inset-x-0 bottom-0 h-0.5 my-0 mx-auto bg-theme-label-primary',
  styles.activeTabIndicator,
);

export const CustomFeedHeader = classed(
  'div',
  'flex h-11 self-stretch items-center mb-6 typo-callout',
);

export const FeedPageHeader = classed(
  'header',
  'overflow-x-auto self-stretch mb-6 no-scrollbar hidden laptop:flex',
);

export const customFeedIcon = 'text-2xl text-theme-label-tertiary mr-2';

export const Summary = classed('summary', 'cursor-pointer focus-outline');

export const SummaryArrow = classed(ArrowIcon, 'icon arrow ml-auto text-xl');

export const SummaryContainer = classed(
  'div',
  'text-theme-label-secondary multi-truncate border-l border-theme-status-cabbage pl-4',
);

export const TLDRText = classed(
  'span',
  'pr-1 font-bold text-theme-status-cabbage',
);

export const HotLabel = (): ReactElement => (
  <div className="py-px px-2 font-bold text-white uppercase rounded typo-caption2 bg-theme-status-error">
    Hot
  </div>
);

export const getTextEllipsis = <
  P extends HTMLAttributes<T>,
  T extends HTMLElement,
>(
  type: keyof ReactHTML = 'span',
): ClassedHTML<P, T> =>
  classed<P, T>(type, 'overflow-hidden whitespace-nowrap text-ellipsis');

export const SecondaryCenteredBodyText = classed(
  'p',
  'typo-body text-theme-label-secondary text-center',
);

export type HTMLElementComponent<T = HTMLElement> = React.FC<HTMLAttributes<T>>;

export enum MainFeedPage {
  MyFeed = 'my-feed',
  Popular = 'popular',
  Search = 'search',
  Upvoted = 'upvoted',
  Discussed = 'discussed',
}

export const FeedHeading = classed(
  'h3',
  'flex flex-row flex-1 items-center typo-headline',
);

export const getShouldRedirect = (
  isOnMyFeed: boolean,
  isLoggedIn: boolean,
): boolean => {
  if (!isOnMyFeed) {
    return false;
  }

  if (!isLoggedIn) {
    return true;
  }

  return false;
};

export const FlexRow = classed('span', 'flex flex-row');

interface ContextPosition {
  x: number;
  y: number;
}

export const getContextBottomPosition = (
  e: React.MouseEvent,
): ContextPosition => {
  const { right, bottom } = e.currentTarget.getBoundingClientRect();

  return { x: right, y: bottom + 4 };
};
