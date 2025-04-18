import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
  // URL 객체 생성
  const { searchParams } = new URL(req.url);
  // 검색 파라미터 가져오기
  const query = searchParams.get("query");

  try {
    const response = await axios.get(`https://giphy.com/search/${query}`);
    const html = response.data;

    // Cheerio를 사용하여 HTML 파싱
    const $ = cheerio.load(html);

    // gif 링크 배열
    const gifLinks: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $(".giphy-grid a").each((index: number, element: any) => {
      const imgElement = $(element).find("img");
      const imgSrc = imgElement.attr("src") || "";

      gifLinks.push(imgSrc);
    });

    return NextResponse.json(
      {
        data: gifLinks.length > 0 ? gifLinks : [],
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        data: null,
        error: "GIF 검색 요청 처리 실패",
      },
      { status: 500 }
    );
  }
}
