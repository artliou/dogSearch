# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Step 1: Architecture

Please see the PDFs and images in the repo. I creaetd these mocks in LucidChart.

### Step 2: Coding Project

- [x] **React**, Vue, or Angular UI.
- [x] The resulting dog breed(s) should be displayed to the user after clicking a button.
- [x] Attributes can be pre-defined (choose from a limited number of possible attributes) or using a text input field. Either one is acceptable.
- Front-end only, no back-end.
- The user should be able to use attributes (eyes: brown, etc) and use nested boolean AND/OR operators to find a specific dog breed.
- Search can just perform an exact match to determine whether or not the string is contained within a column of the dataset. We are not testing on search or search result quality.
- The CSV can be modified if needed. Feel free to use a different dataset if you determine it better demonstrates your skillset.
- Quality comments and a readme will be strongly considered.

### Key Indicators

- You should aim to show off your skills and play to your strengths while demonstrating a thorough analysis of the problem during the review session.
- We do not expect you to complete every feature in the takehome. We do expect you to have considered all components in the architecture and understand what is needed to implement them.
- Have fun with it! We love it when candidates change and customize their solutions to demonstrate unique skills they have. Adherence to the project requirements is not mandatory.

## Author Notes and Reflections on Future

I left `console.log()`s commented out throughout the application, as an equivalent to server logs and a way to see data moving through various of the UI components and through the application.

The only feature I did not end up developing (from Key Indicators bullet point 2) was the nested operators. 

The next step I would take is to adapt for nested operators by including a "Add Group" button in the `DropDownMenu` component, so that I could group nested operators together. If I was thinking about scaling this out, I would likely cap the amount of nested groups at a certain depth, so it does not produce an unruly user experience.

After implementing nested operators, I would then consider a improved UX and refactor the UI accordingly, as there are some parts of the UI/UX that I think could be improved.