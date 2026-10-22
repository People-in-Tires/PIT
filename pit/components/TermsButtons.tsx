"use client"

import { useState } from "react"
import React from "react";
export default function TermsButton(){
 const [showTerms, setShowTerms] = useState(false);
	return <React.Fragment>
		<button onClick={() => setShowTerms((prevValue) => !prevValue)}>
		{" "}
		show terms of service{" "}
		</button>
		{showTerms && (
			<li>
			<ul>Terms of Service</ul>
			<ul>
			By creating a People in Tires account you agree to the
			following privacy policy
			</ul>
			<ul>
			The database containing all personal information: name,
			email, password(hashed), country of origin will be wiped
			after evaluation or 30 days whichever comes first
			</ul>
		</li>
              )}
	</React.Fragment>
}