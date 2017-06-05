import { Osm.AppPage } from './app.po';

describe('osm.app App', () => {
  let page: Osm.AppPage;

  beforeEach(() => {
    page = new Osm.AppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
