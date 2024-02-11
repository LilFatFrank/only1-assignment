This is an assignment by Only1 for creating a clean dropdown that can display a loading as well as an error state.

## Getting Started

The dropdown component is `dropdown-menu.tsx` in the `components/ui` folder.

- The component is reusable
- It has a loading state and an error state
- It has a clean and simple animation
- It accepts the below props:

```
interface SelectDemoProps {
 options: string[];
 loading: boolean;
 error: string;
 searchText: string;
 onInputChange: (val: string) => void;
 label?: string;
 subText?: string;
}
```

## Using the Dropdown Menu

An example for using the dropdown component is written in the `page.tsx` file.

- To render values in the dropdown, a dummy api `https://jsonplaceholder.typicode.com/users` is used
- A debounce of 0.5s is used to efficiently handle user input
- Error handling is managed using try-catch

## About the project

The project uses [Next.js](https://nextjs.org) written in [Typescript](https://www.typescriptlang.org/) with [Tailwind](https://tailwindcss.com).
Other dependencies include [Shadcn/UI](https://ui.shadcn.com/).
