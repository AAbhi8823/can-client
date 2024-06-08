import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { baseurl } from "../Api/baseUrl";
import LandingPageFooter from "./LandingPageFooter";
import NavLanding from "../Components/NavLanding";
import "./ContactUs.css";
function PrivacyPolicies() {
  const [Nav, setNav] = useState(false);
  const [navUser, setNavuser] = useState();
  const iframeRef = useRef();
  const handleScroll = () => setNav(window.scrollY > 50);
  useEffect(() => {
    const checkScroll = () => setNav(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const LandingData = async () => {
    const token = Cookie.get("token");
    const homeUser = localStorage.getItem("active_user");
    try {
      const { data } = await axios.post(
        `${baseurl}/api/singleuser?token=${token}`,
        {
          id: `${homeUser}`,
        }
      );
      setNavuser(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    LandingData();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-center">
          <NavLanding onStateChange={Nav} />
        </div>
        <div className="pri mt-[130px] w-full px-[10%]">
          <h3 className="text-[#084943] text-[43px] font-[700] flex justify-center py-[30px] ">
            Privacy Policies
          </h3>
          <p className="text-center">
            We build a range of services that will help many people daily to
            discuss on cancer awareness, a platform to explore and interact with
            the world in new ways. You can use our services by signing up for a
            CAN Account and we safeguard your privacy by our safety measures.
          </p>
          <h4>KEY TERMS</h4>

          <ul>
            <li>
              <strong> Affiliates -</strong> An affiliate is an entity that
              belongs to the CAN group of companies.
            </li>
            <li>
              <strong>Algorithm -</strong> A process or set of rules followed by
              a computer in performing problem solving operations.
            </li>
            <li>
              <strong>Application data cache -</strong> An application data
              cache is a data repository on a device.
            </li>
            <li>
              <strong>Browser web storage -</strong> Browser web storage enables
              websites to store data in a browser on a device. When used in
              “local storage” mode, it enables data to be stored across
              sessions. This makes data retrievable even after a browser has
              been closed and reopened.
            </li>
            <li>
              <strong>CAN -</strong> CAN means Cancer Anonymous.
            </li>
            <li>
              <strong>CAN Account -</strong> You have to access our services by
              signing up for a CAN Account and providing us with some personal
              information (typically your name, email address, and password).
              This account information is used to authenticate you when you
              access CAN services and protect your account from unauthorized
              access by others. You can edit your account at any time through
              your CAN Account setting.
            </li>
            <li>
              <strong>Cookies -</strong> A cookie is a small file containing a
              string of characters that is sent to your computer when you visit
              a website. When you visit the site again, the cookie allows that
              site to recognize your browser. Cookies may store user preferences
              and other information. You can configure your browser to refuse
              all cookies or to indicate when a cookie is being sent. However,
              some website features or services may not function properly
              without cookies.
            </li>
            <li>
              <strong>Device -</strong> A device is a computer that can be used
              to access CAN services. It includes desktop computers, laptops,
              tablets, smartphones, and other devices.
            </li>
            <li>
              <sstrong>IP Address -</sstrong> Every device connected to the
              Internet is assigned a number known as an Internet protocol (IP)
              address. These numbers are usually assigned in a geographic block.
              An IP address can often be used to identify the location from
              which a device is connecting to the internet.
            </li>
            <li>
              <strong>Non-personally identifiable information -</strong> This is
              information that is recorded about users so that it no longer
              reflects or references an individually identifiable user.
            </li>
            <li>
              <strong>Personal Information -</strong> This is the information
              that you provide to us that personally identifies you, such as
              your name, email address, or billing information, or other data
              that can be reasonably linked to such information by CAN, such as
              information we associate with your CAN Account.
            </li>
            <li>
              <strong>Referrer URL -</strong> A Referrer URL (Uniform Resource
              Locator) is information transmitted to a destination webpage by a
              web browser, typically when you click a link to that page. The
              Referrer URL contains the URL of the last webpage the browser
              visited.
            </li>
            <li>
              <strong>Sensitive personal information -</strong> This particular
              category of personal information relates to topics such as
              confidential medical facts, racial or ethnic origins, political or
              religious beliefs, or sexuality.
            </li>
            <li>
              <strong>Server logs -</strong> Like most websites, our servers
              automatically record the page requests made when you visit our
              sites. These “server logs” typically include your web request,
              Internet Protocol address, browser type, browser language, the
              date and time of your request, and one or more cookies that may
              uniquely identify your browser.
            </li>
            <li>
              <strong>Unique Identifiers -</strong> A unique identifier is a
              string of characters that can be used to uniquely identify a
              browser, app, or device. Different identifiers vary in how
              permanent they are, whether they can be reset by users, and how
              they can be accessed. Unique identifiers can be used for various
              purposes, including security and fraud detection, syncing services
              such as your email inbox, remembering your preferences, and
              providing personalized advertising.
            </li>
          </ul>

          <h4>Collection and Use of Personal Information </h4>
          <p style={{ paddingBottom: "15px" }}>
            Personal information is data that can be used to identify or contact
            a single person.You may be asked to provide your personal
            information anytime you are in contact with a CAN or CAN-affiliated
            company. CAN and its affiliates may share this personal information
            with each other and use it consistent with this Privacy Policy. They
            may also combine it with other information to provide and improve
            our products, services, content, and advertising. You are not
            required to provide the personal information that we have requested,
            but, if you choose not to do so, in many cases we will not be able
            to provide you with our products or services or respond to any
            queries you may have. Here are some examples of the types of
            personal information CAN may collect and how we may use it:
          </p>

          <ul className="list-space">
            <li>
              <strong>Information we collect as you use our services -</strong>
            </li>
            <li>
              <strong>Your Apps,Browsers & Devices -</strong> We collect
              information about the apps, browsers, and devices you use to
              access CAN services, which helps us provide features to you.This
              information we collect includes unique identifiers, browser type
              and settings, device type and settings, operating system, mobile
              network information including carrier name and phone number, and
              application version number. We also collect information about the
              interaction of your apps, browsers, and devices with our services,
              including IP address, crash reports, system activity, and the
              date, time, and referrer URL of your request.
            </li>
            <li style={{ margin: "0px" }}>
              <strong>Your Activity -</strong> We collect information about your
              activity in our services, which we use to improvise your
              experience on our platform. This activity information we collect
              may include-
            </li>
            <ul>
              <li>Terms you search for</li>
              <li>Views and interaction with content</li>
              <li>Purchase activity</li>
              <li>People with whom you communicate or share content</li>
              <li>
                Activity on third-party sites and apps that use our services.
              </li>
            </ul>

            <li style={{ margin: "0px" }}>
              <strong>Your Location Information -</strong> We collect location
              information when you use our services, which helps us offer you
              better services based on your location. Depending on the products
              you re using and the settings you choose, CAN may use different
              types of location information to help make some services and
              products you use more helpful. These include:
            </li>
            <ul>
              <li>GPS and other sensor data from your device</li>
              <li>IP address</li>
              <li>Activity on CAN services, such as from your searches</li>
            </ul>
            <p style={{ margin: "15px 0px" }}>
              The type of location data we collect and how long we store it
              depends in part on your device and account settings. We use
              various technologies to collect and store information, including
              cookies, local storage, database, and server logs.
            </p>

            <li>
              <strong>How we use your personal information -</strong> We may
              process your personal information: for the purposes described in
              this Privacy Policy, with your consent, for compliance with a
              legal obligation to which CAN is subject or when we have assessed
              it is necessary for the purposes of the legitimate interests
              pursued by CAN or a third party to whom it may be necessary to
              disclose information.
            </li>
            <li>
              <strong>Development and Improvisation of our service -</strong> We
              also use personal information to help us create, develop, operate,
              deliver, and improve our products, services, content, and
              advertising, and for loss prevention and anti-fraud purposes. We
              may also use your personal information for account and network
              security purposes, including in order to protect our services for
              the benefit of all our users. Where we use your information for
              anti-fraud purposes it arises from the conduct of an online
              transaction with us. We limit our uses of data for anti-fraud
              purposes to those that are strictly necessary and within our
              assessed legitimate interests to protect our customers and our
              services. For certain online transactions, we may also validate
              the information provided by you with publicly accessible sources±
              Ý Iden²ifica²ionÉofÉUser - We may use your personal information,
              including your date of birth, to verify identity, assist with the
              identification of users, and to determine appropriate services.
            </li>
            <li>
              <strong>Communication about services used -</strong> From time to
              time, we may use your personal information to send important
              notices, such as communications about purchases and changes to our
              terms, conditions, and policies. Because this information is
              important to your interaction with CAN, you may not opt out of
              receiving these communications.
            </li>
            <li>
              <strong>Internal Purposes -</strong> We may also use personal
              information for internal purposes such as auditing, data analysis,
              and research to improve CANs products, services, and customer
              communications.
            </li>
          </ul>
          <h4>Collection and Use of Non-Personal Information</h4>
          <p>
            We also collect data in a form that does not, on its own, permit
            direct association with any specific individual. We may collect,
            use, transfer, and disclose non-personal information for any
            purpose. The following are some examples of nonpersonal information
            that we collect and how we may use it-
          </p>
          <ul>
            <li>
              We may collect information such as occupation, language, zip code,
              area code, unique device identifier, referrer URL, location, and
              the time zone where a CAN product is used so that we can better
              understand customer behavior and improve our products, services,
              and advertising±
            </li>
            <li>
              We may collect information regarding customer activities on our
              website services and from our other products and services. This
              information is aggregated and used to help us provide more useful
              information to our customers and to understand which parts of our
              website, products, and services are of most interest. Aggregated
              data is considered non-personal information for the purposes of
              this Privacy Policy.
            </li>
            <li>
              We may collect and store details of how you use our services,
              including search queries. This information may be used to improve
              the relevancy of results provided by our services. Except in
              limited instances to ensure the quality of our services over the
              Internet, such information will not be associated with your IP
              address.
            </li>
            <li>
              With your explicit consent, we may collect data about how you use
              your device and applications in order to help developers improve
              their websites/apps.
            </li>
          </ul>
          <p>
            If we do combine non-personal information with personal information
            the combined information will be treated as personal information for
            as long as it remains combined.
          </p>

          <h4>Cookies and Other Technologies</h4>
          <p>
            CANs websites, online services, interactive applications, email
            messages, and advertisements may use cookies and other technologies
            such as pixel tags and web beacons. These technologies help us
            better understand user behavior, tell us which parts of our websites
            people have visited, and facilitate and measure the effectiveness of
            advertisements and web searches. We treat information collected by
            cookies and other technologies as non-personal information. However,
            to the extent that Internet Protocol (IP) addresses or similar
            identifiers are considered personal information by local law, we
            also treat these identifiers as personal information. Similarly, to
            the extent that non-personal information is combined with personal
            information, we treat the combined information as personal
            information for the purposes of this Privacy Policy.
          </p>
          <p>
            CAN and our partners also use cookies and other technologies to
            remember personal information when you use our website, online
            services, and applications. Our goal in these cases is to make your
            experience with CAN more convenient and personal. If you want to
            disable cookies and you re using the Safari web browser, go to
            Safari preferences and then to the privacy pane to manage your
            preferences.{" "}
          </p>
          <p>
            As is true of most internet services, we gather some information
            automatically and store it in log files. This information includes
            Internet Protocol (IP) addresses, browser type and language,
            Internet service provider (ISP), referring and exit websites and
            applications, operating system, date.time stamp, and clickstream
            data.
          </p>
          <p>
            We use this information to understand and analyze trends, to
            administer the site, to learn about user behavior on the site, to
            improve our product and services, and to gather demographic
            information about our user base as a whole. CAN may use this
            information in our marketing and advertising services.
          </p>
          <p>
            In some of our email messages, we use a “click-through URL” linked
            to content on the CAN website. When customers click one of these
            URLs, they pass through a separate web server before arriving at the
            destination page on our website. We track this click-through data to
            help us determine interest in particular topics and measure the
            effectiveness of our customer communications. If you prefer not to
            be tracked in this way, you should not click text or graphic links
            in the email messages.
          </p>
          <p>
            Pixel tags enable us to send email messages in a format customers
            can read, and they tell us whether mail has been opened. We may use
            this information to reduce or eliminate messages sent to customers.
          </p>

          <h4>Disclosure to Third Parties</h4>
          <p>
            At times CAN may make certain personal information available to
            strategic partners that work with CAN to provide products and
            services, or that help CAN market to customers.{" "}
          </p>

          <h4>Service Providers</h4>
          <p>
            CAN shares personal information with companies who provide services
            such as information processing, extending credit, fulfilling
            customer orders, delivering products to you, managing and enhancing
            customer data, providing customer service, assessing your interest
            in our products and services, and conducting customer research or
            satisfaction surveys. These companies are obligated to protect your
            information and may be located wherever CAN operates.
          </p>

          <h4>Disclosure to Government Agency</h4>
          <p>
            It may be necessary by law, legal process, litigation, and.or
            requests from public and governmental authorities within or outside
            your country of residence for CAN to disclose your personal
            information. We may also disclose information about you if we
            determine that for purposes of national security, law enforcement,
            or other issues of public importance, disclosure is necessary or
            appropriate.
          </p>
          <p>
            We may also disclose information about you if we determine that
            disclosure is reasonably necessary to enforce our terms and
            conditions or protect our operations or users. Additionally, in the
            event of a reorganization, merger, or sale we may transfer any and
            all personal information we collect to the relevant third party.
          </p>

          <h4>Protection of Personal Information</h4>
          <p>
            CAN takes the security of your personal information very seriously.
            When your personal data is stored by CAN, we use computer systems
            with limited access housed in facilities using physical security
            measures. When you use some CAN products, services, or applications
            or post on a CAN forum, chat room, or social networking service, the
            personal information and content you share is visible to other users
            and can be read, collected, or used by them. You are responsible for
            the personal information you choose to share or submit in these
            instances. For example, if you list your name and email address in a
            forum posting, that information is public. Please take care when
            using these features.
          </p>

          <h4>Integrity and Retention of Personal Information</h4>
          <p>
            CAN makes it easy for you to keep your personal information
            accurate, complete, and up to date. We will retain your personal
            information for the period necessary to fulfill the purposes
            outlined in this Privacy Policy and our service specific privacy
            summaries. When assessing these periods we carefully examine our
            need to collect personal information at all and if we establish a
            relevant need we only retain it for the shortest possible period to
            realize the purpose of collection unless a longer retention period
            is required by law.
          </p>

          <h4>Third-Party Sites and Services</h4>
          <p>
            CAN websites, products, applications, and services may contain links
            to third-party websites, products, and services. Our products and
            services may also use or offer products or services from third
            parties Information collected by third parties, which may include
            such things as location data or contact details, is governed by
            their privacy practices. We encourage you to learn about the privacy
            practices of those third parties.
          </p>

          <h4>When this policy applies</h4>
          <p>
            This Privacy Policy applies to all of the services offered by CAN
            and its affiliates, and services offered on third-party sites. This
            Privacy Policy doesn t apply to services that have separate privacy
            policies that do not incorporate this Privacy Policy.
          </p>

          <h4>Changes to this policy</h4>
          <p>
            We change this privacy policy from time to time. We will not reduce
            your rights under the Privacy Policy without your explicit consent.
            We always indicate the date the last changes were published. If
            changes are significant, we ll provide a more prominent notice.
          </p>

          <h4>Grievance Resolution</h4>
          <p>
            We are fully dedicated in providing a resolution to the grievance
            with regard to the privacy policy.
          </p>
          <p>
            Our dedicated grievance redressal officer -{" "}
            <strong>Pushkar Shaw</strong>
          </p>
          <p>
            You can write to him.us at{" "}
            <strong> cansupport@welcometocan.com </strong> in case of any
            grievance.{" "}
          </p>
          <br></br>
          <p>
            Our privacy policy adviser and formulator -{" "}
            <strong>Adv. Varun Katiyar </strong>
          </p>
          <p>
            You can write to him at{" "}
            <strong>
              {" "}
              <a href="mailto:adv.varunkatiyar@gmail.com">
                adv.varunkatiyar@gmail.com
              </a>
            </strong>
          </p>
        </div>
        <div className="mapandits-element contact-wrap"></div>
        <div className="mt-[45px]">
          <LandingPageFooter />
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicies;
