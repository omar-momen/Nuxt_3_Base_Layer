import { useLangStore } from "@/stores/lang";
import { useThemeStore } from "@/stores/theme";
import { useGlobalStore } from "@/stores/global";

export const useLayerHelpers = () => {
  // const route = useRoute();
  // const router = useRouter();

  return {
    // scrollToElement: (sectionId) => {
    //   if (route.path == "/") {
    //     const el = document.querySelector(`${sectionId}`);
    //     if (el) {
    //       el.scrollIntoView({ behavior: "smooth" });
    //     }
    //   } else {
    //     new Promise((resolve, reject) => {
    //       resolve(router.push("/"));
    //     }).then((res) => {
    //       setTimeout(() => {
    //         const el = document.querySelector(`${sectionId}`);
    //         el.scrollIntoView({ behavior: "smooth" });
    //       }, 2000);
    //     });
    //   }
    // },

    numbersToSuffix(num) {
      if (num === 0) return "0";
      const suffixes = ["", "K", "M", "B", "T"]; // add more suffixes if needed
      const i = Math.floor(Math.log10(num) / 3);
      const scaled = num / Math.pow(10, i * 3);
      return scaled.toFixed(1).replace(/\.0$/, "") + suffixes[i];
    },

    preventNonNumeric: (e) => {
      const charCode = e.which ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
      }
    },

    capitalizeEveryWord: (sentence) => {
      const words = sentence.split(" ");

      const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });

      const capitalizedSentence = capitalizedWords.join(" ");

      return capitalizedSentence;
    },

    formatDate(dateInput, input_order, output_order) {
      let my_date = "";
      // If dateInput is a string, proceed with the original logic
      if (typeof dateInput === "string") {
        if (dateInput.includes("T")) {
          dateInput = dateInput.split("T")[0];
        }

        // Split the input date string by '/', '-', or ' ' to handle letious formats
        let parts = dateInput.split(/[/\s-]/);

        // Ensure that there are three parts (day, month, year)
        if (parts.length !== 3) {
          // If the format is incorrect, return null or throw an error
          return null;
        }

        // Parse the parts into integers
        let day, month, year;
        if (input_order) {
          if (input_order === "dmy") {
            day = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10);
            year = parseInt(parts[2], 10);
          } else if (input_order == "mdy") {
            month = parseInt(parts[0], 10);
            day = parseInt(parts[1], 10);
            year = parseInt(parts[2], 10);
          }
        } else {
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          day = parseInt(parts[2], 10);
        }

        // Create a Date object
        my_date = new Date(year, month - 1, day); // Months are zero-based

        // Ensure the date object is valid
        if (isNaN(my_date.getTime())) {
          // If the date is invalid, return null or throw an error
          return null;
        }
      } else if (dateInput instanceof Date) {
        // If dateInput is a Date object, use it directly
        my_date = dateInput;
      } else {
        // If the input is neither a string nor a Date object, return null
        return null;
      }

      // Get the year, month, and day from the date object
      let year = my_date.getFullYear();
      let month = my_date.getMonth() + 1; // Adding 1 because months are zero-based
      let day = my_date.getDate();

      // Pad month and day with leading zeros if necessary
      let monthStr = month < 10 ? "0" + month : month.toString();
      let dayStr = day < 10 ? "0" + day : day.toString();

      // Construct the formatted date string
      if (output_order) {
        if (output_order === "dmy") {
          return `${dayStr}-${monthStr}-${year}`;
        } else if (output_order === "mdy") {
          return `${monthStr}-${dayStr}-${year}`;
        }
      } else {
        return `${dayStr}-${monthStr}-${year}`;
      }
    },

    shuffle: (array) => {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },

    getSubRandomArr: (arr) => {
      const shuffledArray = arr.slice();
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray.slice(
        0,
        Math.floor(Math.random() * shuffledArray.length - 1)
      );
    },
  };
};
