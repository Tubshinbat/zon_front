const fetcher = async (url, options = { cache: "no-cache" }) => {
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default fetcher;
