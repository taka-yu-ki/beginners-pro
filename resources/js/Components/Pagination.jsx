import { Link } from "@inertiajs/react";
import { BiChevronsLeft, BiChevronLeft, BiChevronRight, BiChevronsRight } from "react-icons/bi";
import { startOfWeek, add, format } from "date-fns";
  
export default function Pagination({ paginator = {} }) {
    const format_this_week = () => {
        const default_data = [];
        
        const start_of_this_week = startOfWeek(new Date(), { weekStartsOn: 1 });
        for (let i = 0; i < 7; i++) {
            const date = format(add(start_of_this_week, { days: i}), "yyyy-MM-dd");
            default_data.push({"date": date});
        }
        
        return default_data;
    };
    
    const date_array = Object.values(paginator.data)[0] || format_this_week();

    const {
        first_page_url,
        last_page_url,
        next_page_url,
        prev_page_url,
        current_page,
        last_page,
    } = paginator;

    return (
        <div className="grid grid-flow-col justify-center gap-2 items-center p-4 text-gray-500">
            <Link
                href={first_page_url}
                preserveScroll
                className={`text-2xl  ${current_page === 1 ? "opacity-50 pointer-events-none" : ""}`}
            >
                <BiChevronsLeft />
            </Link>
            <Link
                href={prev_page_url}
                preserveScroll
                className={`text-2xl ${!prev_page_url ? "opacity-50 pointer-events-none" : ""}`}
            >
                <BiChevronLeft />
            </Link>
            <span className="text-base">
                {`${date_array[0]?.date || ""} ~ ${date_array[6]?.date || ""}`}
            </span>
            <Link
                href={next_page_url}
                preserveScroll
                className={`text-2xl ${!next_page_url ? "opacity-50 pointer-events-none" : ""}`}
            >
                <BiChevronRight />
            </Link>
            <Link
                href={last_page_url}
                preserveScroll
                className={`text-2xl ${current_page === last_page ? "opacity-50 pointer-events-none" : ""}`}
            >
                <BiChevronsRight />
            </Link>
        </div>
    );
}
