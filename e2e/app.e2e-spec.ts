import { TechocampUiPage } from './app.po';

describe('techocamp-ui App', () => {
  let page: TechocampUiPage;

  beforeEach(() => {
    page = new TechocampUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
