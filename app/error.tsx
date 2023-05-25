"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default Error;
