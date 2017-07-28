import { AuctionPage } from './app.po';

describe('auction App', () => {
  let page: AuctionPage;

  beforeEach(() => {
    page = new AuctionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
