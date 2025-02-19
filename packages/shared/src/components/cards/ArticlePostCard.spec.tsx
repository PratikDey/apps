import React from 'react';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import { ArticlePostCard } from './ArticlePostCard';
import { FeaturesContextProvider } from '../../contexts/FeaturesContext';
import post from '../../../__tests__/fixture/post';
import { PostCardProps } from './common';

const defaultProps: PostCardProps = {
  post,
  onPostClick: jest.fn(),
  onUpvoteClick: jest.fn(),
  onCommentClick: jest.fn(),
  onBookmarkClick: jest.fn(),
  onShare: jest.fn(),
  onShareClick: jest.fn(),
  onReadArticleClick: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

const renderComponent = (props: Partial<PostCardProps> = {}): RenderResult => {
  return render(
    <FeaturesContextProvider flags={{}}>
      <ArticlePostCard {...defaultProps} {...props} />
    </FeaturesContextProvider>,
  );
};

it('should call on link click on component left click', async () => {
  renderComponent();
  const el = await screen.findByTitle('The Prosecutor’s Fallacy');
  el.click();
  await waitFor(() => expect(defaultProps.onPostClick).toBeCalled());
});

it('should call on link click on component middle mouse up', async () => {
  renderComponent();
  const el = await screen.findByText('Read post');
  el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, button: 1 }));
  await waitFor(() =>
    expect(defaultProps.onReadArticleClick).toBeCalledTimes(1),
  );
});

it('should call on upvote click on upvote button click', async () => {
  renderComponent();
  const el = await screen.findByLabelText('Upvote');
  el.click();
  await waitFor(() =>
    expect(defaultProps.onUpvoteClick).toBeCalledWith(post, true),
  );
});

it('should call on comment click on comment button click', async () => {
  renderComponent();
  const el = await screen.findByLabelText('Comments');
  el.click();
  await waitFor(() => expect(defaultProps.onCommentClick).toBeCalledWith(post));
});

it('should call on share click on share button click', async () => {
  renderComponent({});
  const el = await screen.findByLabelText('Share post');
  el.click();
  await waitFor(() => expect(defaultProps.onShareClick).toBeCalled());
});

it('should not display publication date createdAt is empty', async () => {
  renderComponent({
    ...defaultProps,
    post: { ...post, createdAt: null },
  });
  const el = screen.queryByText('Jun 13, 2018');
  expect(el).not.toBeInTheDocument();
});

it('should format publication date', async () => {
  renderComponent();
  const el = await screen.findByText('Jun 13, 2018');
  expect(el).toBeInTheDocument();
});

it('should format read time when available', async () => {
  renderComponent();
  const el = await screen.findByTestId('readTime');
  expect(el).toHaveTextContent('8m read time');
});

it('should hide read time when not available', async () => {
  const usePost = { ...post };
  delete usePost.readTime;
  renderComponent({ post: usePost });
  expect(screen.queryByTestId('readTime')).not.toBeInTheDocument();
});

it('should show author name when available', async () => {
  renderComponent();
  const el = await screen.findByText('Ido Shamun');
  expect(el).toBeInTheDocument();
});

it('should show trending flag', async () => {
  const usePost = { ...post, trending: 20 };
  renderComponent({ post: usePost });
  expect(
    await screen.findByText('20 devs read it last hour'),
  ).toBeInTheDocument();
});
