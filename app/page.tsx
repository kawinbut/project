export default function Home() {
  return (
    <div className="container py-5">
      <div className="text-center">

        <h1 className="display-4 fw-bold">
          Welcome to MyApp
        </h1>

        <p className="lead text-muted">
          Next.js + Bootstrap
        </p>

        <div className="mt-4">
          <a href="/products" className="btn btn-primary btn-lg">
            View Products
          </a>
        </div>

      </div>
    </div>
  );
}
