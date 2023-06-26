// run via: npx ts-node .\sample.ts

import pptxgen from "pptxgenjs";

// Create a new presentation
const ppt = new pptxgen();

// Add a slide with a title and content
const slide1 = ppt.addSlide();
slide1.addText("Welcome to My Presentation", { x: 1, y: 1, fontSize: 24 });
slide1.addText("This is the content of the slide.", {
  x: 1,
  y: 2,
  fontSize: 18,
});

// Add another slide with an image
const slide2 = ppt.addSlide();
slide2.addImage({ path: 'sample-img.PNG', x: 0.5, y: 0.5, w: 8, h: 4 });

// Set presentation properties
ppt.title = "My Presentation";
ppt.author = 'John Doe';
ppt.company = 'My Company';

// Save the presentation as a .pptx file
let writeFileProps = {
  fileName: "test-output.pptx",
};
try {
  ppt.writeFile(writeFileProps);
} catch (e) {
  console.log(e);
}
