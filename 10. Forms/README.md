# 10. Building Forms

## Building a Form

```typescript
// src/components/Form.tsx
const Form = () => {
  return (
    <form>
      <div className="b-3">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input id="age" type="number" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

```typescript
// src/App.tsx
import Form from "./components/Form";

function App() {
  return (
    <>
      <Form />
    </>
  );
}

export default App;
```

## Handling Form Submission

```typescript
import { FormEvent } from "react";

const Form = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="b-3">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input id="age" type="number" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

## Accessing Input Fields

`useRef`함수가 최초 호출되는 시점에는 `DOM`이 그려지지 않았기 때문에 `null` 값으로 설정됩니다.

```typescript
import { FormEvent, useRef } from "react";

const Form = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = { name: "", age: 0 };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (nameRef.current !== null) {
      // console.log(nameRef.current.value);
      person.name = nameRef.current.value;
    }

    if (ageRef.current !== null) {
      // console.log(ageRef.current.value);
      person.age = parseInt(ageRef.current.value);
    }

    console.log(person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="b-3">
        <label htmlFor="name">Name</label>
        <input ref={nameRef} id="name" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input ref={ageRef} id="age" type="number" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

## Controlled Components

```typescript
import { FormEvent, useState } from "react";

const Form = () => {
  const [person, setPerson] = useState({
    name: "",
    age: "",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="b-3">
        <label htmlFor="name">Name</label>
        <input
          onChange={(event) =>
            setPerson({ ...person, name: event.target.value })
          }
          value={person.name}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          value={person.age}
          onChange={(event) =>
            setPerson({ ...person, age: event.target.value })
          }
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

## Managing Forms with React Hook Form

앱의 규모가 커질수록 `useState Hook` 등을 사용해 `state` 값을 관리하는게 복잡하고 많은 시간이 소요됩니다. 이때 `React Hook Form`을 활용하면 `Form` 관련 작업 시간을 줄여주고, 코드 또한 간결해져 유지보수에 용이합니다.

```typescript
import { FormEvent, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit } = useForm();
  // console.log(form);
  // console.log(register("name"));

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="b-3">
        <label htmlFor="name">Name</label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age")}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

## Applying Validation

`errors.`을 입력했을 때 별도의 자동완성이 없는 것을 확인할 수 있습니다. 이러한 부분을 개선해 개발에 도움을 주고자, `interface FormData`를 정의해 보다 더 정밀한 개발을 구현할 수 있습니다.

```typescript
import { FormEvent, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";

interface FormData {
  name: string;
  age: number;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  // console.log(form);
  // console.log(register("name"));

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="b-3">
        <label htmlFor="name">Name</label>
        <input
          {...register("name", { required: true, minLength: 3 })}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name?.type === "required" && (
          <p className="text-danger">The name is required</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="text-danger">The name must be at least 3 characters</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age")}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

## Schema based Validation with Zod

각 `Input` 값을 검증하는 로직이 코드 중간에 위치하거나 혹은 로직의 수가 증가할수록 코드 가독성과 유지보수가 힘들어집니다.
이러한 상황에 대비해 `Zod`와 같은 모듈을 사용하면 보다 가독성과 유지보수가 좋은 코드를 작성할 수 있습니다.
`Zod`와 같은 검증(Validation) 도구를 `Schema Validation`이라 칭합니다.

Keywords:

- Schema Validation
- Custom Validation Rules

```bash
npm install zod
npm install @hookform/resolvers
```

```typescript
import { FormEvent, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  age: z
    .number({ invalid_type_error: "Age field is required" })
    .min(18, { message: "Age must be at least 18." }),
});

// interface FormData {
//   name: string;
//   age: number;
// }

// Interface 대신에 zod에서 제공해주는 기능을 통해 구현할 수 있습니다.
type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="b-3">
        <label htmlFor="name">Name</label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

## Disabling the Submit Button

```typescript
import { FormEvent, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  age: z
    .number({ invalid_type_error: "Age field is required" })
    .min(18, { message: "Age must be at least 18." }),
});

// interface FormData {
//   name: string;
//   age: number;
// }

// Interface 대신에 zod에서 제공해주는 기능을 통해 구현할 수 있습니다.
type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="b-3">
        <label htmlFor="name">Name</label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
```

## Expense Tracker
