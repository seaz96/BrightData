namespace digital_portfolio.Helpers;
public static class ListExtensions
{
    private static Random rnd = new ();

    public static void Shuffle<T>(this List<T> list)
    {
        var n = list.Count;
        while (n > 1)
        {
            n--;
            var k = rnd.Next(n + 1);
            (list[k], list[n]) = (list[n], list[k]);
        }
    }
}
