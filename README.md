# DashBoard

A modern web application for managing tasks in a task board-style interface.

## Features

- **Drag-and-Drop:** Move tasks between sections effortlessly using `dnd-kit`.
- **Task Management:** Add tasks with details.
- **Authentication:** Secure user access using JWT tokens.

## Tech Stack

- **Frontend:** React.js, Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Drag-and-Drop:** dnd-kit
- **Authentication:** FireBase
- **State Management:** Redux
- **Due Date and Reminder:** Add due date functionality with a reminder option
- **Subtasks:** Implement a feature to add subtasks to each main task, allowing for nested task
- **Customizable Task Fields:** Let users create custom fields (e.g., custom tags or priority levels) 
to suit different types of workflows.
- 
management within each task item. 
## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository:**
   ```bash
   [git clone https://github.com/Nasir-buddy/test_project
   ```

2. **Install dependencies:**
   Using npm:
   ```bash
   npm install
   ```
   Or using Yarn:
   ```bash
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the development server:**
   Using npm:
   ```bash
   npm run dev
   ```
   Or using Yarn:
   ```bash
   yarn dev
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`.

## How to Use

1. **Add a Task:**
   - Click on the "Add Task" button.
   - Enter the task name, description, and assign collaborators.

2. **Move Tasks:**
   - Drag a task card and drop it into the desired section.

3. **Authentication:**
   - Log in or sign up to start managing your tasks.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- Special thanks to the creators of `dnd-kit` for the drag-and-drop functionality.
- Thanks to the Next.js and Tailwind CSS communities for their invaluable resources.

---

Feel free to explore, use, and contribute to the project. Happy coding!
