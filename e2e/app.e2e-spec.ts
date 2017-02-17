import { GimlyPage } from './app.po';

describe('gimly App', function() {
  let page: GimlyPage;

  beforeEach(() => {
    page = new GimlyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
