import React, { Fragment } from "react";
import RepInput from "./components/repInput/RepInput";
import { Divider } from "react-native-paper";

interface JumpAttempt {
  id: number;
  attempt: string;
  completed: boolean;
}

interface RepListProps {
  jumpAttempts: JumpAttempt[];
  maxInputLength: number;
  onRepInput: (id: number, jumpDistance: string) => void;
  onCheckboxChange: (id: number, checked: boolean) => void;
}

export default function RepList({
  jumpAttempts,
  maxInputLength,
  onRepInput,
  onCheckboxChange,
}: RepListProps) {
  return (
    <>
      {jumpAttempts.map((attempt) => (
        <Fragment key={attempt.id}>
          <RepInput
            id={attempt.id}
            attempt={attempt}
            maxInputLength={maxInputLength}
            onInputChange={onRepInput}
            onCheckboxChange={onCheckboxChange}
          />
          <Divider />
        </Fragment>
      ))}
    </>
  );
}
