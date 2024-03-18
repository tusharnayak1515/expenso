"use client";

import React from "react";

const Features = () => {
  return (
    <div className={`h-auto w-full bg-slate-600`}>
      <div
        className={`min-h-[45vh] p-6 md:p-8 w-[calc(100%-30px)] sm:w-[calc(100%-50px)] mx-auto 
        text-slate-200 flex flex-col justify-start items-center gap-6 md:gap-8`}
      >
        <p className={`text-2xl sm:text-3xl font-bold`}>Features</p>

        <div
          className={`w-full lg1:w-[95%] xl:w-[90%] 
          grid grid-cols-1 xs:grid-cols-2 md_link:grid-cols-3 lg1:grid-cols-4 gap-6`}
        >
          <div
            className={`min-h-[150px] w-full p-4
              flex flex-col justify-start items-center gap-2 
              rounded-md shadow-featureShadow bg-slate-900`}
          >
            <p className={`text-lg text-center font-semibold`}>
              Track Expenses Seamlessly
            </p>
            <p className={`text-slate-400 text-sm text-center`}>
              Log expenses on-the-go. Expenso syncs across devices so you can
              track from anywhere.
            </p>
          </div>

          <div
            className={`min-h-[150px] w-full p-4
              flex flex-col justify-start items-center gap-2 
              rounded-md shadow-featureShadow bg-slate-900`}
          >
            <p className={`text-lg text-center font-semibold`}>
              Visualize Spending Patterns
            </p>
            <p className={`text-slate-400 text-sm text-center`}>
              See expense data visualized in easy-to-understand charts and
              graphs. Get insights into spending categories and trends.
            </p>
          </div>

          <div
            className={`min-h-[150px] w-full p-4
              flex flex-col justify-start items-center gap-2 
              rounded-md shadow-featureShadow bg-slate-900`}
          >
            <p className={`text-lg text-center font-semibold`}>
              Access Expense Data Anytime
            </p>
            <p className={`text-slate-400 text-sm text-center`}>
              Expenso backs up data securely in the cloud. Download expense
              information conveniently anytime, from any device.
            </p>
          </div>

          <div
            className={`min-h-[150px] w-full p-4
              flex flex-col justify-start items-center gap-2 
              rounded-md shadow-featureShadow bg-slate-900`}
          >
            <p className={`text-lg text-center font-semibold`}>
              Contacts & Credit Tracking
            </p>
            <p className={`text-slate-400 text-sm text-center`}>
              Easily add and organize your contacts, including vendors and
              clients, within Expenso.
            </p>
          </div>

          <div
            className={`min-h-[150px] w-full p-4
              flex flex-col justify-start items-center gap-2 
              rounded-md shadow-featureShadow bg-slate-900`}
          >
            <p className={`text-lg text-center font-semibold`}>
              Automated Monthly Reports
            </p>
            <p className={`text-slate-400 text-sm text-center`}>
              Receive a summarized monthly expense report delivered to your
              inbox. Stay on top of spending without extra effort.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
