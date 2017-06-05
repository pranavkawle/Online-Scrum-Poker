import { browser, by, element } from 'protractor';

export class Osm.AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('osm-root h1')).getText();
  }
}
