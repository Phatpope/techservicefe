import { useState } from 'react';

const NewLetterCall = () => {
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your handler function here with the phone value
    console.log('Phone:', phone);
    // Reset the phone input field
    setPhone('');
    // Set the submission status to true
    setIsSubmitted(true);
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">Đăng Ký Tư Vấn Sản Phẩm.</h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Nhân Viên Tư Vấn Sẽ Liên Hệ Bạn Xớm Nhất Để Chốt Deal !</p>
            <form onSubmit={handleSubmit}>
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                <div className="relative w-full">
                  <label htmlFor="phone" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
</svg>

                  </div>
                  <input
                    className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your phone number"
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-black border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    CallMe
                  </button>
                </div>
              </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">
                {isSubmitted && (
                  <p className="text-green-500">Submission successful! Our team will contact you soon.</p>
                )}
                {!isSubmitted && (
                  <>
                    We care about the protection of your data.{' '}
                    <a href="#" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewLetterCall;
