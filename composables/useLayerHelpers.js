export const useLayerHelpers = () => {
  const route = useRoute();
  const router = useRouter();

  return {
    scrollToElement: (sectionId) => {
      if (route.path == "/") {
        const el = document.querySelector(`${sectionId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        new Promise((resolve, reject) => {
          resolve(router.push("/"));
        }).then((res) => {
          setTimeout(() => {
            const el = document.querySelector(`${sectionId}`);
            el.scrollIntoView({ behavior: "smooth" });
          }, 2000);
        });
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

    numberToSuffix(num) {
      if (num === 0) return "0";
      const suffixes = ["", "K", "M", "B", "T"]; // add more suffixes if needed
      const i = Math.floor(Math.log10(num) / 3);
      const scaled = num / Math.pow(10, i * 3);
      return scaled.toFixed(1).replace(/\.0$/, "") + suffixes[i];
    },

    numberToCommas(number) {
      return Math.round(number)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  };
};
