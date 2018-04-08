import { Selector } from 'testcafe';

fixture `Testing header`
    .page `http://localhost:3000/`;

test('ShouldLoadHeader', async t => {
  const name=Selector('body > div:nth-child(4) > div.fade.in.modal > div > div > div.modal-body > input');
  await t.typeText(name,'TestCafeUser');
  const nameModalBtn=Selector('body > div:nth-child(4) > div.fade.in.modal > div > div > div.modal-footer > button');
  await t.click(nameModalBtn);

    const header = Selector('#root > div > header > h1');
    await t.expect(header.innerText).eql('Office bingo');
});
