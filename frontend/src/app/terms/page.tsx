import React from 'react';

const Terms: React.FC = () => {
  const lastUpdated = 'June 20, 2024'; // 手動で更新日を入力

  return (
    <div className="max-w-4xl mx-auto p-6 mt-14">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="text-sm text-gray-600 mb-8">Last updated: {lastUpdated}</p>

      <p className="mb-4">Welcome to Wellness Mons!</p>

      <p className="mb-4">
        These terms and conditions outline the rules and regulations for the use of Wellness Mons's Website and App. By accessing this Website or using our App, you accept these terms and conditions in full. Do not continue to use Wellness Mons's Website or App if you do not accept all of the terms and conditions stated on this page.
      </p>

      <h2 className="text-2xl font-semibold mb-4">1. Terms</h2>
      <p className="mb-4">
        By accessing this Website or using our App, you agree to comply with these terms and conditions. If you disagree with any part of these terms and conditions, do not use our Website or App.
      </p>

      <h2 className="text-2xl font-semibold mb-4">2. Cookies</h2>
      <p className="mb-4">
        We use cookies to store information such as your nickname, email, authentication token, plan status, and other details. This is necessary to enable the proper functioning of the app based on user information. By using Wellness Mons, you consent to the use of cookies in accordance with our privacy policy.
      </p>

      <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
      <p className="mb-4">
        All images, expressions, and other digital content within www.wellnessmons.com are the property of Wellness Mons. Unauthorized use is prohibited. You may not use, copy, or distribute any of the materials without our explicit permission.
      </p>

      <h2 className="text-2xl font-semibold mb-4">4. Sharing and Linking</h2>
      <p className="mb-4">
        You may share or link to the introduction of our app and the links themselves without needing prior permission.
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. Reservation of Rights</h2>
      <p className="mb-4">
        We reserve the right to request that you remove all links or any particular link to our Website. You agree to immediately remove all links to our Website upon request.
      </p>

      <h2 className="text-2xl font-semibold mb-4">6. Disclaimer</h2>
      <p className="mb-4">
        The information provided by Wellness Mons is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
      </p>
      <p className="mb-4">
        The use of our app does not guarantee any results regarding beauty, diet, health, or lifestyle improvements. We are not responsible for any health problems or damages that may arise during the use of our app. We also do not guarantee the preservation of any data you provide, and we are not responsible for any loss or deletion of data.
        The service may be terminated without notice, but we will not be liable for any disadvantages resulting from such termination.
      </p>

      <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
      <p className="mb-4">
        To the maximum extent permitted by applicable law, Wellness Mons shall not be liable for any incidental, indirect, consequential, special, or punitive damages of any kind, or any other damages whatsoever, including, without limitation, those resulting from loss of profit, loss of contracts, goodwill, data, information, income, anticipated savings or business relationships, arising out of or in connection with the use of this Website or App.
      </p>
      <p className="mb-4">
        Our total liability for any claim arising out of or relating to the use of our services shall not exceed $100.
      </p>

      <h2 className="text-2xl font-semibold mb-4">8. User Responsibilities</h2>
      <p className="mb-4">
        Users are responsible for managing and keeping their passwords and email addresses secure. Users must not allow third parties to use their credentials. We are not responsible for any damages resulting from insufficient password or email address management, misuse, or unauthorized use by third parties.
      </p>

      <h2 className="text-2xl font-semibold mb-4">9. Service Interruption</h2>
      <p className="mb-4">
        We may suspend or discontinue the service without prior notice in the following cases:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>When performing maintenance or inspection of the computer system related to the service</li>
        <li>If the computer, communication line, or server stops due to an accident</li>
        <li>In the event of natural disasters, wars, riots, labor disputes, or other force majeure events</li>
        <li>Any other case where we deem suspension or interruption is necessary</li>
      </ul>
      <p className="mb-4">
        We are not responsible for any damages incurred by users due to the suspension or interruption of services.
      </p>

      <h2 className="text-2xl font-semibold mb-4">10. Account Termination</h2>
      <p className="mb-4">
        We reserve the right to delete accounts that are involved in malicious activities, such as sending large amounts of data, spam attacks, or any other harmful behavior.
      </p>
      <p className="mb-4">
        If an account is deleted, all data associated with that account will be permanently deleted. We are not responsible for any compensation regarding this deletion.
      </p>
      <p className="mb-4">
        Sharing third-party information within the service is strictly prohibited.
      </p>

      <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms and Conditions</h2>
      <p className="mb-4">
        We regularly review and improve our Terms and Conditions to ensure ongoing improvements. We may update these Terms and Conditions as necessary. When changes are made, we will notify users through the app ,email or our website. By continuing to use the service after such changes, you agree to the revised Terms and Conditions.
      </p>

      <p className="mb-4">
        By using our service, you also agree to our Privacy Policy and other related policies. Please be sure to confirm followings.
      </p>
      <div className='m-8 flex flex-col'>
        <a href='/privacy-policy' className='text-blue-500 hover:underline'>・Privacy Policy</a>
        <a href='/cookie-policy' className='text-blue-500 hover:underline'>・Cookie Policy</a>
      </div>

      <p className="mb-4">If you have any questions about these Terms, please contact us.</p>
    </div>
  );
};

export default Terms;
