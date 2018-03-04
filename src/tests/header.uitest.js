import { Selector } from 'testcafe';

fixture `Testing header`
    .page `http://localhost:3000/`;

test('ShouldLoadHeader', async t => {
    const header = Selector('#root > div > header > h1');
    await t.expect(header.innerText).eql('Office bingo');
});
