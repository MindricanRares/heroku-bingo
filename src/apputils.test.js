import pickAnswers from "./apputils";

test('shouldPickUniqueAnswers',()=>{
    const answers=pickAnswers();
    expect((new Set(answers)).size === answers.length).toBe(true);
})