"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { City, Country, State } from "country-state-city";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

interface IformFieldData {
  country: string;
  state: string;
  city: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPass: string;
  profileImage: File | null;
  language: string;
  term: boolean;
}

const generateDefaultValues = (): IformFieldData => {
  return {
    country: "",
    state: "",
    city: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPass: "",
    profileImage: null,
    language: "",
    term: false,
  };
};
const maxProfilePictureInMB = 5;
const maxProfilePictureSize = maxProfilePictureInMB * 1024 * 1024; //5 MB;
const maxPhoneNumber = 10;
const schema = Yup.object().shape({
  country: Yup.string().required("Country is required."),
  state: Yup.string().required("State is required."),
  city: Yup.string().required("City is require."),
  name: Yup.string().required("Name is required."),
  email: Yup.string()
    .email("Email Format is not correct.")
    .required("Email is required."),
  phone: Yup.string().required("Phone number is required.").min(10),
  password: Yup.string().required().min(6, "Must be 6 cheraters."),
  confirmPass: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Password must match.!!!"),
  language: Yup.string().required("Language is required."),
  profileImage: Yup.mixed()
    .required("Profile Picture is Required.")
    .test("fileType", "Please select a picture to upload.", (value: any) => {
      return true;
      // return (
      //   value &&
      //   value !== null &&
      //   ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      // );
    })
    .test(
      "fileSize",
      `Profile Picture size must not exceed ${maxProfilePictureInMB} MB`,
      (value: any) => {
        return value && value.size <= maxProfilePictureSize;
      }
    ),
  // term: Yup.boolean().oneOf(["true"], "Accept term and condition"),
  // term: Yup.boolean().required("Accept term and condition"),
});

export default function Home() {
  const countries = Country.getAllCountries();
  // console.log(countries, "states1");
  const states = State.getAllStates();
  // console.log(states, "states2");
  const cities = City.getAllCities();
  // console.log(cities, "states3");

  const languages = ["Hindi", "English", "Odia"];
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IformFieldData>({
    defaultValues: generateDefaultValues(),
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IformFieldData) => {
    console.log(data, "formDtat:success");
  };

  console.log("error", errors);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>SignUp Form Validation</h1>
        <div className="flex w-full max-w-5xl gap-x-4">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="myform_container">
              <div className="myform_input">
                <label htmlFor="name">Full Name</label>
                <Controller
                  control={control}
                  name="name"
                  render={({
                    field: { value, onChange },
                    fieldState: { error, invalid },
                  }) => {
                    return (
                      <input
                        type="text"
                        id="name"
                        value={value}
                        onChange={onChange}
                        placeholder="Enter your Name"
                      />
                    );
                  }}
                />
                {errors && (
                  <p style={{ color: "red" }}>{errors.name?.message}</p>
                )}
              </div>
              <div className="myform_input">
                <label htmlFor="email">Email</label>
                <Controller
                  control={control}
                  name="email"
                  render={({
                    field: { value, onChange },
                    fieldState: { error, invalid },
                  }) => {
                    return (
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your Email"
                        value={value}
                        onChange={onChange}
                        // onChange=
                      />
                    );
                  }}
                />
                {errors && (
                  <p style={{ color: "red" }}>{errors.email?.message}</p>
                )}
              </div>
              <div className="myform_input">
                <label htmlFor="phone">Phone Number</label>
                <Controller
                  control={control}
                  name="phone"
                  render={({
                    field: { value, onChange },
                    fieldState: { error, invalid },
                  }) => {
                    return (
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder="Enter your Phone"
                        value={value}
                        onChange={onChange}
                        // onChange=
                      />
                    );
                  }}
                />
                {errors && (
                  <p style={{ color: "red" }}>{errors.phone?.message}</p>
                )}
              </div>
              <div className="myform_input">
                <label htmlFor="password">Password</label>
                <Controller
                  control={control}
                  name="password"
                  render={({
                    field: { value, onChange },
                    fieldState: { error, invalid },
                  }) => {
                    return (
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your Password"
                        value={value}
                        onChange={onChange}
                      />
                    );
                  }}
                />
                {errors && (
                  <p style={{ color: "red" }}>{errors.password?.message}</p>
                )}
              </div>
              <div className="myform_input">
                <label htmlFor="confirmPass">Confirm Password</label>
                <Controller
                  control={control}
                  name="confirmPass"
                  render={({
                    field: { value, onChange },
                    fieldState: { error, invalid },
                  }) => {
                    return (
                      <input
                        type="password"
                        name="confirmPass"
                        id="confirmPass"
                        placeholder="Confirm your Password"
                        value={value}
                        onChange={onChange}
                      />
                    );
                  }}
                />
                {errors && (
                  <p style={{ color: "red" }}>{errors.confirmPass?.message}</p>
                )}
              </div>
              <div className="profile_media">
                <Controller
                  control={control}
                  name="profileImage"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <>
                        <div className="media_container">
                          <Image
                            src={
                              value && value !== null && value instanceof File
                                ? URL.createObjectURL(value)
                                : "/public/next.svg"
                            }
                            alt="profile-photo"
                            width={100}
                            height={100}
                            priority={true}
                          />
                        </div>
                        <div className="media_input">
                          <label htmlFor="profileImage">Profile Image</label>
                          <input
                            name="profileImage"
                            id="profileImage"
                            type="file"
                            onChange={(e) => {
                              onChange(e.target.files?.[0]);
                              console.log(e.target.files?.[0], "image");
                            }}
                            accept="image/png, image/jpeg, image/jpg"
                          />
                          {errors && (
                            <p style={{ color: "red" }}>
                              {errors.profileImage?.message}
                            </p>
                          )}
                        </div>
                      </>
                    );
                  }}
                />
              </div>
              <div className="myform_select">
                <label htmlFor="country">Country</label>
                <Controller
                  control={control}
                  name="country"
                  render={({
                    field: { value, onChange },
                    fieldState: { error, invalid },
                  }) => {
                    return (
                      <select id="country" onChange={onChange}>
                        <option value="">Select Country</option>
                        {countries.map((item, _idx) => (
                          <option key={_idx} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    );
                  }}
                />
                {errors && (
                  <p style={{ color: "red" }}>{errors.country?.message}</p>
                )}
              </div>

              <div className="myform_select">
                <label htmlFor="state">State</label>
                <Controller
                  control={control}
                  name="state"
                  render={({
                    field: { value, onChange },
                    fieldState: { error, invalid },
                  }) => {
                    return (
                      <select id="state" onChange={onChange}>
                        <option value="">Select State</option>
                        {states.map((item, _idx) => (
                          <option key={_idx} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    );
                  }}
                />
                {errors && (
                  <p style={{ color: "red" }}>{errors.state?.message}</p>
                )}
              </div>

              <div className="myform_select">
                <label htmlFor="city">City</label>
                <Controller
                  control={control}
                  name="city"
                  render={({
                    field: { value, onChange },
                    fieldState: { error, invalid },
                  }) => {
                    return (
                      <select id="city" onChange={onChange}>
                        <option value="">Select City</option>
                        {cities.map((item, _idx) => (
                          <option key={_idx} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    );
                  }}
                />
                {errors && (
                  <p style={{ color: "red" }}>{errors.city?.message}</p>
                )}
              </div>
              <div className="myform_select">
                <label htmlFor="language">Language</label>
                <Controller
                  control={control}
                  name="language"
                  render={({
                    field: { value, onChange },
                    fieldState: { error, invalid },
                  }) => {
                    return (
                      <select id="language" onChange={onChange}>
                        <option value="">Select Language</option>
                        {languages.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    );
                  }}
                />
                {errors && (
                  <p style={{ color: "red" }}>{errors.language?.message}</p>
                )}
              </div>

              <div className="w-full">
                <Controller
                  control={control}
                  name="term"
                  render={({
                    field: { value, onChange },
                    fieldState: { error, invalid },
                  }) => {
                    return (
                      <input type="checkbox" id="checkbox" onClick={onChange} />
                    );
                  }}
                />
                <label htmlFor="term">
                  I agree to the terms and conditions
                </label>
                {errors && (
                  <p style={{ color: "red" }}>{errors.term?.message}</p>
                )}
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="myform_values"></div>
        </div>
      </main>
    </>
  );
}
