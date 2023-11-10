export const withMobile = (style: string) => {
  return `
    @media screen and (max-width:678px ) {
      ${style}
    }
  `;
};

export const verticalCenter = `
    display: flex;
    justify-content: center;
    align-items: center;
`;
