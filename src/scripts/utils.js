import {format as d3Format} from "d3-format";
import {timeDay as d3TimeDay} from "d3-time";
import {timeDays as d3TimeDays} from "d3-time";
import {timeMonth as d3TimeMonth} from "d3-time";

let utils = {
    getReadingTime(string) {
        let WORDS_PER_MINUTE = 260;
        let result = {};
        let regex = /\w+/g;

        result.wordCount = (string || "").match(regex).length;
        result.readingTime = Math.ceil(result.wordCount / WORDS_PER_MINUTE);

        return result;
    },
    getMarkdownTitles() {
        let selector = Array.from({length: 2}, (_, i) => `.markdown-body h` + (i + 2));
        let nodes = Array.from(document.querySelectorAll(selector));
        let titles = nodes.map(node => ({
            title: node.innerText,
            id: node.id,
            depth: Number(node.nodeName[1]),
        }));
        let minDepth = Math.min(...titles.map(title => title.depth));
        return {nodes, titles, minDepth};
    },
    isInViewport(elem) {
        var distance = elem.getBoundingClientRect();
        return (
            distance.top >= 0 &&
            distance.left >= 0 &&
            distance.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            distance.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    isUpperCase(string) {
        return /^[A-Z]*$/.test(string);
    },
    isEmailValid(email) {
        return /\S+@\S+\.\S+/.test(email);
    },
    slugify(str) {
        // inverse-ish of getLabel
        let slug = str.toLowerCase().replaceAll(" ", "-").replaceAll("'", "");
        slug = slug.replace(/(?:[^\w-.]+|_+)/g, " ");
        return slug;
    },
    getLabel(value) {
        // inverse-ish of slugify
        return value
            .split("-")
            .map(str => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            })
            .join(" ");
    },

    filters: {
        getReadingTime: string => utils.getReadingTime(string),
        slugify: string => utils.slugify(string),
        isUpperCase: string => utils.isUpperCase(string),
        isEmailValid: string => utils.isEmailValid(string),
        getLabel: string => utils.getLabel(string),
    },
};

export default utils;
