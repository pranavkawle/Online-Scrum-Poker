using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Osm.Server.Models
{
    public class RandomStringGenerator
    {
        private const string AllowedChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private static Random _random = new Random();

        public static string Generate()
        {
            return RandomStrings(AllowedChars, 6, 8, 1, _random).First();
        }

        private static IEnumerable<string> RandomStrings(string allowedChars, int minLength, int maxLength, int count, Random rng)
        {
            char[] chars = new char[maxLength];
            int setLength = allowedChars.Length;

            while (count-- > 0)
            {
                int length = rng.Next(minLength, maxLength + 1);

                for (int i = 0; i < length; ++i)
                {
                    chars[i] = allowedChars[rng.Next(setLength)];
                }

                yield return new string(chars, 0, length);
            }
        }
    }
}
