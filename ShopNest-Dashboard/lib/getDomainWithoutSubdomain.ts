export const getDomainWithoutSubdomain = (url:string) => {
    const hostname = new URL(url).hostname;
    const parts = hostname.split('.').slice(-2); // Keeps only the base domain (e.g., "shopnest.com")
    return `.${parts.join('.')}`;
  };    
  