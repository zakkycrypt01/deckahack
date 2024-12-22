import React from 'react';

const NewsletterPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Join Our Newsletter</h1>
        <p className="text-lg text-neutral-content">Stay updated with the latest news and insights in cryptocurrency.</p>
      </header>

      {/* Subscription Form */}
      <div className="flex justify-center mb-8">
        <form className="flex flex-col sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered mb-4 sm:mb-0 sm:mr-2"
            required
          />
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered mb-4 sm:mb-0 sm:mr-2"
            required
          />
          <button type="submit" className="btn btn-primary">Subscribe Now</button>
        </form>
      </div>

      {/* Benefits Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Why Subscribe?</h2>
        <ul className="list-disc list-inside">
          <li>Exclusive updates on new features and promotions.</li>
          <li>Insights into the cryptocurrency market.</li>
          <li>Tips and guides to make the most of your trading experience.</li>
        </ul>
      </section>

      {/* Past Newsletters Preview Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Past Newsletters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Placeholder for past newsletters */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="font-bold">Newsletter #1</h3>
              <p className="text-sm">Highlights of the latest trends in cryptocurrency.</p>
              <button className="btn btn-secondary">Read More</button>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="font-bold">Newsletter #2</h3>
              <p className="text-sm">Tips for secure trading practices.</p>
              <button className="btn btn-secondary">Read More</button>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="font-bold">Newsletter #3</h3>
              <p className="text-sm">Latest market analysis and predictions.</p>
              <button className="btn btn-secondary">Read More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">What Our Subscribers Say</h2>
        <blockquote className="border-l-4 border-primary pl-4 italic">
          “The newsletter keeps me informed and ahead of the game in the cryptocurrency market!”
        </blockquote>
      </section>
    </div>
  );
};

export default NewsletterPage;
