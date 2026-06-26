const HomePage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div>
      <h1>Мій день</h1>
      <p>Головна сторінка застосунку “Лелека”.</p>
    </div>
  );
};

export default HomePage;
