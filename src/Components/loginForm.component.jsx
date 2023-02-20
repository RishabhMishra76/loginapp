import React, { useEffect, useState } from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import enPh from "react-phone-number-input/locale/en.json";
import classes from '../Components/loginForm.module.css'

const SignUpForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [marketplaces, setMarketplaces] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  countries.registerLocale(enLocale);
  countries.registerLocale(itLocale);

  const countryObj = countries.getNames("en", { select: "official" });
  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  const marketplacesOptions = [
    "Amazon",
    "Flipkart",
    "Shopify",
    "Ebay",
    "Noon",
    "Walmart",
  ];

  const handleSubmit = (e) => {
    debugger
    e.preventDefault();
    if(fullName && email && phoneCountryCode && phoneNumber && companyName && password && confirmPassword) {
        setTermsChecked(true)
    }
    if (termsChecked && password === confirmPassword) {
      setFormSubmitted(true);
    } else {
        if(!termsChecked) {
            alert("Fill all the required fields marked with asterik to submit the form.");
        } else {
            alert("Passwod and Confirm password are not matching!");
        }
    }
  };
  

  return (
    <>
    {!formSubmitted ? 
    (
    <div className={classes.centerDiv}><form className={classes.container} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="full-name">Full Name <span className={classes.red}>*</span></label>
        <input
          id="full-name"
          type="text"
          required
          value={fullName}
          className={classes.inputChange}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email Address <span className={classes.red}>*</span></label>
        <input
          id="email"
          type="email"
          required
          value={email}
          className={classes.inputChange}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone-country-code">
          Phone Number with Country code <span className={classes.red}><span className={classes.red}>*</span></span>
        </label>
        <select
          value={phoneCountryCode}
          onChange={(event) =>
            setPhoneCountryCode(event.target.value || undefined)
          }
          name="countrySelect"
        >
          {/* <option value={enPh.ZZ}>{enPh.ZZ}</option> */}
          {getCountries().map((country) => (
            <option key={country} value={country}>
              {enPh[country]} +{getCountryCallingCode(country)}
            </option>
          ))}
        </select>
        <input
          id="phone-number"
          type="text"
          required
          value={phoneNumber}
          className={classes.inputChangePhone}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="company-name">Company Name <span className={classes.red}>*</span></label>
        <input
          id="company-name"
          type="text"
          required
          value={companyName}
          className={classes.inputChange}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="country-name">Country Name</label>
        <select
          id="country-name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select a country</option>
          {!!countryArr?.length &&
            countryArr.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Marketplaces Covered</label>
        {marketplacesOptions.map((option) => (
          <label key={option} htmlFor={option}>
            <input
              id={option}
              type="checkbox"
              value={option}
              checked={marketplaces.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  setMarketplaces([...marketplaces, option]);
                } else {
                  setMarketplaces(marketplaces.filter((itm) => itm !== option));
                }
              }}
            />
            {option}
          </label>
        ))}
      </div>
      <div>
        <label htmlFor="create-password">Create Password <span className={classes.red}>*</span></label>
        <input
          id="password"
          type="password"
          minlength="8"
          required
          value={password}
          className={classes.inputChange}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirm-password">Confirm Password <span className={classes.red}>*</span></label>
        <input
          id="confirm-password"
          type="password"
          minlength="8"
          required
          value={confirmPassword}
          className={classes.inputChange}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <br />
      <br />
      <button type="submit" onSubmit={(e) => {handleSubmit(e)}}> Submit </button>
    </form></div>) : (<div>Your Sign Up has been successful</div>)}
    </>
  )
};

export default SignUpForm;
